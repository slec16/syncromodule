var interface = new Vue({
    el: '#app',
    data: {
        sitename: 'Модуль синхронизации',
        timestamp: '',
        status: {
            gate: '',
            refsignal: '',
        },
        erorState: '',
    },
    created() {
        setInterval(this.getNow, 1000);
    },
    methods: {
        getNow: function() {
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const dateTime = date +' '+ time;
            this.timestamp = dateTime;
        },
        
        submitValue() {
            console.log(this.status.gate);
            console.log(this.status.refsignal);
            const CA = require('node-epics-ca');
            // (async () => {
            //     try {
            //         let value;
            //         const pv = new CA.Channel('calcExample1');
            //         await pv.connect();
            //         value = await pv.get();
            //         console.log(value);
            //         await pv.put(this.status.gate);
            //         value = await pv.get();
            //         console.log(value);
            //         await pv.disconnect()
            //     } catch (error) {
            //         console.log(error);
            //     }
            // })();
            (async () => {
                try {
                    let value;
                    const pv = new CA.Channel('freq');
                    await pv.connect();
                    value = await pv.get();
                    console.log(value);
                    await pv.put(this.status.refsignal);
                    value = await pv.get();
                    console.log(value);
                    await pv.disconnect()
                } catch (error) {
                   console.log(error);
                }
            })()
        },

        checkValue() {
            // this.status.gate = 4;
             const CA = require('node-epics-ca').default;
            //  const CA = require('node-epics-ca');
            // (async () => {
            //     try {
            //         console.log(await CA.get('calcExample'));
            //     } catch (error) {
            //         console.error(`get failed due to ${error}`)
            //     }
            // })()
           // const CA = require('node-epics-ca').default;

            //let pv = new CA.Channel('gate');
            (async () => {
                try {
                    let pv = new CA.Channel('gate');
                    await pv.connect();
                    let value = await pv.get();
                    this.state.gate = value
                    console.log(value);
                    await pv.disconnect()
                } catch (error) {
                   console.log(error);
                }
            })();
            //let pv1 = new CA.Channel('freq');
            // (async () => {
            //     try {
            //         let pv1 = new CA.Channel('calcExample2');
            //         await pv1.connect();
            //         let value1 = await pv1.get();
            //         this.state.refsignal = value1
            //         console.log(value1);
            //         await pv1.disconnect()
            //     } catch (error) {
            //        console.log(error);
            //     }
            // })()
        }
    },
    

})

