function decine(num: number) {
    if (num > 5) {
        for (let index = 0; index < 5; index++) {
            led.plot(index, 0)
        }
    }
    
    let index2 = 0
    while (index2 <= num - 5) {
        led.plot(index2, 1)
        index2 += 1
    }
}

function inclinaizone(num2: number) {
    if (num2 < -2) {
        led.plot(0, 2)
    } else if (num2 > 2) {
        led.plot(4, 2)
    } else if (num2 < -1) {
        led.plot(1, 2)
    } else if (num2 > 1) {
        led.plot(3, 2)
    } else {
        led.plot(2, 2)
    }
    
}

function unita(num3: number) {
    if (num3 > 5) {
        for (let index3 = 0; index3 < 5; index3++) {
            led.plot(index3, 3)
        }
    }
    
    let index4 = 0
    while (index4 <= num3 - 5) {
        led.plot(index4, 4)
        index4 += 1
    }
}

let c2 = 0
let c1 = 0
let t1 = 0
let t = 0
serial.redirectToUSB()
let inclinazionemedia = input.rotation(Rotation.Pitch)
let rollmedio = input.rotation(Rotation.Roll)
let tempmedia = input.temperature()
basic.forever(function on_forever() {
    
    let t2 = 0
    t = 0
    t1 = 0
    for (let index5 = 0; index5 < 15; index5++) {
        t = t + input.rotation(Rotation.Pitch)
        t1 = t1 + input.rotation(Rotation.Roll)
        basic.pause(50)
    }
    inclinazionemedia = t / 15
    rollmedio = t1 / 15
    tempmedia = t2 / 15
    serial.writeNumber(inclinazionemedia)
    serial.writeString(",")
    serial.writeNumber(rollmedio)
    serial.writeString(",")
    serial.writeString("" + ("" + input.temperature()))
    serial.writeString(",")
    serial.writeNumber(input.compassHeading())
    serial.writeString(",")
    serial.writeNumber(input.lightLevel())
    serial.writeLine("")
})
basic.forever(function on_forever2() {
    
    basic.clearScreen()
    c1 = Math.idiv(inclinazionemedia, 10)
    c2 = inclinazionemedia % 10
    decine(c1)
    unita(c2)
    inclinaizone(rollmedio)
})
