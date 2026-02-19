function NtoS (num: number) {
    return "" + Math.trunc(num) + "." + ("" + Math.trunc((num - Math.trunc(num)) * 100) + "0000").substr(0, 2)
}
input.onButtonPressed(Button.A, function () {
    mode = 0
})
function decine (num: number) {
    if (num > 5) {
        for (let index = 0; index <= 4; index++) {
            led.plot(index, 0)
        }
        for (let index = 0; index <= num - 6; index++) {
            led.plot(index, 1)
        }
    } else {
        for (let index = 0; index <= num - 1; index++) {
            led.plot(index, 0)
        }
    }
}
function inclinaizone (num2: number) {
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
input.onButtonPressed(Button.B, function () {
    mode = 1
})
function unita (num3: number) {
    if (num3 > 5) {
        for (let index3 = 0; index3 <= 4; index3++) {
            led.plot(index3, 3)
        }
        for (let index3 = 0; index3 <= num3 - 6; index3++) {
            led.plot(index3, 4)
        }
    } else {
        for (let index3 = 0; index3 <= num3 - 1; index3++) {
            led.plot(index3, 3)
        }
    }
}
let c2 = 0
let c1 = 0
let t3 = 0
let t2 = 0
let t1 = 0
let t = 0
let mode = 0
serial.redirectToUSB()
let inclinazionemedia = input.rotation(Rotation.Pitch)
let rollmedio = input.rotation(Rotation.Roll)
let tempmedia = input.temperature()
let compassmedio = input.compassHeading()
mode = 0
basic.forever(function () {
    t = 0
    t1 = 0
    t2 = 0
    t3 = 0
    for (let index = 0; index < 15; index++) {
        t = t + input.rotation(Rotation.Pitch)
        t1 = t1 + input.rotation(Rotation.Roll)
        t2 = t2 + input.temperature()
        t3 = t3 + input.compassHeading()
    }
    inclinazionemedia = t / 15
    rollmedio = t1 / 15
    tempmedia = t2 / 15
    compassmedio = t3 / 15 + 6.5
})
basic.forever(function () {
    basic.clearScreen()
    if (mode == 0) {
        c1 = Math.idiv(inclinazionemedia, 10)
        c2 = inclinazionemedia % 10
        decine(c1)
        unita(c2)
        inclinaizone(rollmedio)
    } else {
        if (compassmedio > 180 && compassmedio < 360) {
            basic.showLeds(`
                . . # . .
                . # . . .
                # # # # #
                . # . . .
                . . # . .
                `)
        } else if (compassmedio == 0 || compassmedio == 360) {
            basic.showIcon(IconNames.Heart)
        } else {
            basic.showLeds(`
                . . # . .
                . . . # .
                # # # # #
                . . . # .
                . . # . .
                `)
        }
    }
    basic.pause(10)
})
basic.forever(function () {
    basic.pause(50)
    serial.writeString("" + (NtoS(inclinazionemedia)))
    serial.writeString(",")
    serial.writeString("" + (NtoS(rollmedio)))
    serial.writeString(",")
    serial.writeString("" + (NtoS(compassmedio)))
    serial.writeString(",")
    serial.writeString("" + (NtoS(tempmedia)))
    serial.writeString(",")
    serial.writeString("" + (NtoS(input.lightLevel())))
    serial.writeLine("")
})
