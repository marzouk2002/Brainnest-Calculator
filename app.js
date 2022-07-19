class Calculator {
    constructor(previousText,currentText) {
        this.currentText=currentText;
        this.previousText=previousText;
        this.clear();
    }

    clear() {
        this.current="";
        this.previous='';
        this.operation=undefined;
    }

    delete() {
        this.current=this.current.toString().slice(0,-1)
    }

    appendNumber(number) {
        if(number=='.' && this.current.includes('.')) return
        this.current=this.current.toString()+number.toString();
    } 

    chooseOperation(operation) {
        if(this.current==='') return
        if(this.previous!=='') {
            this.compute()
        }
        this.operation=operation;
        this.previous=this.current;
        this.current='';
    }

    compute() {
        let computation
        const prev=parseFloat(this.previous)
        const cur=parseFloat(this.current)
        if(isNaN(prev) || isNaN(this.current)) return
        switch(this.operation) {
            case '+':
                computation=prev+cur
                break
            case '-':
                computation=prev-cur
                break
            case '*':
                computation=prev*cur
                break
            case '/':
                computation=prev/cur
                break
            default:
               return
        }
        this.current=computation
        this.operation=undefined
        this.previous=''
    }

    getDisplayNumber(number) {
        const stringNum=number.toString()
        const integerpart=parseFloat(stringNum.split('.')[0])
        const decimalpart=stringNum.split('.')[1]
        let integerDisplay
        if(isNaN(integerpart)) {
            integerDisplay=''
        } else {
            integerDisplay=integerpart.toLocaleString('en',{
                maximumFractionDigits:0})
        }
        if(decimalpart!=null) {
            return `${integerDisplay}.${decimalpart}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentText.innerHTML=this.getDisplayNumber(this.current)
        if(this.operation!=null) {
        this.previousText.innerHTML=`${this.getDisplayNumber(this.previous)} ${this.operation}`
        } else {
            this.previousText.innerHTML=''
        }
    }
}

const numbers=document.querySelectorAll('[data-number]');
const operations=document.querySelectorAll('[data-operation]');
const equal=document.querySelector('[data-equal]');
const delet=document.querySelector('[data-delete]');
const allclear=document.querySelector('[data-all-clear]');
const previousText=document.querySelector('[data-previous-op]');
const currentText=document.querySelector('[data-current-op]');

const calculator= new Calculator(previousText,currentText)

numbers.forEach(button=>button.addEventListener('click',
 ()=>{
     calculator.appendNumber(button.innerText)
     calculator.updateDisplay()
 }))

 operations.forEach(button=>button.addEventListener('click',
 ()=>{
     calculator.chooseOperation(button.innerText)
     calculator.updateDisplay()
 }))

 equal.addEventListener('click',button=> {
     calculator.compute()
     calculator.updateDisplay()
 })

allclear.addEventListener('click', button=> {
    calculator.clear()
    calculator.updateDisplay()
})

delet.addEventListener('click',button=> {
    calculator.delete()
    calculator.updateDisplay()
})