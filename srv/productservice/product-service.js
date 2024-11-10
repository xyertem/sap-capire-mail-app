const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {

    //-------------- SERVICE ENTITIES ----------------//
    const {
        Products,
        ProductDetails
    } = this.entities;

    (async function () {
        db = await cds.connect.to('db');
    })();

    this.on('UPDATE', Products, async (req, res) => {
        const tx = db.tx();
        try {
            const { ID, stock } = req.data;
            const { MailService } = cds.services;

            const product = await tx.run(SELECT.one.from(Products).where({ ID }));
            if(!product) return req.error(404, `Product with ID ${ID} not found`)
                
            let newStock = product.stock - stock;

            if(newStock < 0) return req.error(400, `Insufficient stock. Available stock: ${product.stock}`);
                
            await UPDATE(Products).set({ stock: newStock }).where({ ID });
            
            const response = await MailService.triggerMailEvent();
            
            tx.commit();
            return req.notify(200);
        } catch (error) {
            tx.rollback();
            throw error;
        }

    })
})