class Connection{
    constructor(_neuron, _weight, _bias) {
      this.neuron = _neuron
      this.weight = _weight
      this.bias = _bias
    } 
}
  
class Neuron{
    constructor(outputFunction = () => {}) {
        this.connections = []
        this.value = 0
        this.activationFunction = (value) => {return value<=0 ? 0 : value}
        this.act = outputFunction
    } 

    createConnection(neuron) {
        this.connections.push(new Connection(neuron, (Math.random() * 10) - 5, (Math.random() * 30) - 15))
    }

    activate() {
        this.value = this.activationFunction(this.value)
    }

    passValue() {
        for(let c of this.connections)
            c.neuron.value += ((this.value * c.weight) + c.bias)
    }

}

class Brain{
    constructor(inputNeuronsAmmount, hiddenLayersAmmount, hiddenNeuronsAmmount, outputNeuronsAmmount) {
        this.inputs = this.buildInputLayer(inputNeuronsAmmount)
        this.outputs = this.buildOutputLayer(outputNeuronsAmmount)
        this.hiddenLayer = this.buildHiddenLayer(hiddenLayersAmmount, hiddenNeuronsAmmount)

        this.buildConnections()
    }

    buildInputLayer(neuronsAmmount) {

        let _inputLayer = []

        for(let i=0; i<neuronsAmmount; i++)
        _inputLayer.push(new Neuron())

        return _inputLayer
    }

    buildHiddenLayer(layersAmmount, neuronsPerLayer) {
        let _hiddenLayer = []
        let _layer

        for(let i=0; i<layersAmmount; i++){
        _layer = []
        for(let j=0; j<neuronsPerLayer; j++)
            _layer.push(new Neuron())

        _hiddenLayer.push(_layer)
        }

        return _hiddenLayer

    }

    buildOutputLayer(neuronsAmmount) {

        let _outputLayer = []

        for(let i=0; i<neuronsAmmount; i++)
        _outputLayer.push(new Neuron((value) => {if(value > 0){console.log("😈😈😈😈😈😈😈😈😈😈😈😈")}else console.log("😴😴😴😴😴😴😴😴😴😴😴😴")}))

        return _outputLayer

    }

    buildConnections() {

        //Conexões da camada de entrada com a primeira camada escondida
        for(let ni of this.inputs) {
            for(let nh of this.hiddenLayer[0]) {
                ni.createConnection(nh)
            }
        }

        //Conexões de camada escondida para camada escondida, até a última
        if(this.hiddenLayer.length > 1) {

            for(let i=0; i<(this.hiddenLayer.length - 1); i++) {

                for(let nho of this.hiddenLayer[i]) {
                    for(let nhd of this.hiddenLayer[i+1]){
                        nho.createConnection(nhd)    
                    }
                }

            }

        }

        //Conexões da última camada escondida com a camada de saída
        for(let nh of this.hiddenLayer[(this.hiddenLayer.length - 1)]) {
            for(let no of this.outputs) {
                nh.createConnection(no)
            }
        }

    }

}



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {

    let brains = []
    let brain
    
    for(let i = 0; i < 5000; i++) {
        brains.push(new Brain(2, 1, 3, 1))
    }
    
    let i = 1
    while(true) {

        console.log(` =---------------------= Second ${i} =---------------------= `);

        for(let j in brains){
            brain = brains[j]
            brain.inputs[0].value = (Math.random() * 200) - 100
            brain.inputs[1].value = (Math.random() * 200) - 100

            for(let i of brain.inputs) {
                i.passValue()
            }

            for(let l of brain.hiddenLayer[0]) {
                l.activate()
                l.passValue()
            }

            for(let o of brain.outputs) {
                o.activate()
                console.log(`${Number(j)+1}ª Brain: `)
                o.act(o.value)
            }
        }
        
        i++
        
        await sleep(2000);
        console.clear()

    }

}

demo();
