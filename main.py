def decine(num: number):
    if num > 5:
        for index in range(5):
            led.plot(index, 0)
    index2 = 0
    while index2 <= num - 5:
        led.plot(index2, 1)
        index2 += 1
def inclinaizone(num2: number):
    if num2 < -2:
        led.plot(0, 2)
    else:
        if num2 > 2:
            led.plot(4, 2)
        else:
            if num2 < -1:
                led.plot(1, 2)
            else:
                if num2 > 1:
                    led.plot(3, 2)
                else:
                    led.plot(2, 2)
def unita(num3: number):
    if num3 > 5:
        for index3 in range(5):
            led.plot(index3, 3)
    index4 = 0
    while index4 <= num3 - 5:
        led.plot(index4, 4)
        index4 += 1
c2 = 0
c1 = 0
t1 = 0
t = 0
serial.redirect_to_usb()
inclinazionemedia = input.rotation(Rotation.PITCH)
rollmedio = input.rotation(Rotation.ROLL)
tempmedia = input.temperature()

def on_forever():
    global t, t1, inclinazionemedia, rollmedio, tempmedia
    t2 = 0
    t = 0
    t1 = 0
    for index5 in range(15):
        t = t + input.rotation(Rotation.PITCH)
        t1 = t1 + input.rotation(Rotation.ROLL)
        basic.pause(50)
    inclinazionemedia = t / 15
    rollmedio = t1 / 15
    tempmedia = t2 / 15
    serial.write_number(inclinazionemedia)
    serial.write_string(",")
    serial.write_number(rollmedio)
    serial.write_string(",")
    serial.write_string("" + str((input.temperature())))
    serial.write_string(",")
    serial.write_number(input.compass_heading())
    serial.write_string(",")
    serial.write_number(input.light_level())
    serial.write_line("")
basic.forever(on_forever)

def on_forever2():
    global c1, c2
    basic.clear_screen()
    c1 = Math.idiv(inclinazionemedia, 10)
    c2 = inclinazionemedia % 10
    decine(c1)
    unita(c2)
    inclinaizone(rollmedio)
basic.forever(on_forever2)
