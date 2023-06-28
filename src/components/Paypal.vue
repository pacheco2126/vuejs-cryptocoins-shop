<template>
    <div>
        <div>
            <div id="paypal-button-container"></div>
            <div v-if="success" class="alert alert-success gap-2">
                <strong>Hecho!</strong> Pago realizado correctamente.
            </div>
            <div v-if="error" class="alert alert-danger">
                <strong>Ooops!</strong> Algo ha ido mal!
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'paypal',
    props: ['amount'],
    data() {
        return {
            error: false,
            success: false,
            showStatusModal: false
        }
    },
    methods: {
        sendDataPaypal(creds) {
            return new Promise((resolve, reject) => {
                axios.post('http://localhost:3000/checkout', creds).then(res => {
                    return resolve()
                }).catch((err) => {
                    return reject(err)
                })
            })
        }
    },
    mounted() {
        let client = {
            sandbox: 'AeCK8dvXa-Q5waY1rIWtO9gq3IYxgNoo_tBglJilu5GUsELlNU977bDt7L9BKPFBtv-sqD98Lk9JSYsm',
        }
        let payment = (data, actions) => {
            // Make a call to the REST api to create the payment
            return actions.payment.create({
                payment: {
                    transactions: [
                        {
                            amount: { total: this.amount, currency: 'EUR' }
                        }
                    ]
                }
            });
        }
        let onAuthorize = (data) => {
            var data = {
                paymentID: data.paymentID,
                payerID: data.payerID,
                amount: this.amount
            };
            this.showStatusModal = true;
            this.sendDataPaypal({ data: data }).then(() => {
                this.success = true
            }).catch(err => {
                this.error = true
            });
            this.navigateToPaymentDoneView();
        }
        paypal.Button.render({
            env: 'sandbox', // sandbox | production
            style: {
                //heigh: 25,
                layout: 'horizontal', // vertical | horizontal
                label: 'paypal',
                size: 'medium',    // small | medium | large | responsive
                shape: 'rect',     // pill | rect
                color: 'blue',     // gold | blue | silver | black | white
                tagline: false
            },
            commit: true,
            client,
            payment,
            onAuthorize
        }, '#paypal-button-container');
    }
}
</script>

<style>
.button-container {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
