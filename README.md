<p align="center">
  <a href="https://github.com/homebridge/homebridge"><img src="https://raw.githubusercontent.com/homebridge/branding/master/logos/homebridge-color-round-stylized.png" height="140"></a>
</p>

<span align="center">

# homebridge-pool-sensor-piface

[![npm](https://img.shields.io/npm/v/homebridge-pool-sensor-piface.svg)](https://www.npmjs.com/package/homebridge-pool-sensor-piface) [![npm](https://img.shields.io/npm/dt/homebridge-pool-sensor-piface.svg)](https://www.npmjs.com/package/homebridge-pool-sensor-piface)

</span>

## Description
Pool sensor plugin for [HomeBridge](https://github.com/nclarkau/homebridge-pool-sensor-piface) for Raspberry Pi with PiFace board.

This plugin is suitable for any digital temperature sensor interfaced with a PiFace Digital board.

This code is adapted from [homebridge-garage-piface](https://github.com/LeJeko/homebridge-garage-piface)

## Requirement

Before installing this plug-in, you need:

* Download, build and install the C libraries:

```bash
sudo apt-get install automake libtool git
git clone https://github.com/thomasmacpherson/piface.git
cd piface/c
./autogen.sh && ./configure && make && sudo make install
sudo ldconfig
cd ../scripts
sudo ./spidev-setup
```

* Activate SPI

```bash
sudo raspi-config
-> Interfacing Options -> Enable SPI
```

## Installation

```bash
npm -g install homebridge-pool-sensor-piface
```
## Configuration

_config.json_

```
"accessories": [
	{
	"accessory": "PoolPiFace",
	"name": "Pool",
	"refresh": 60 // optional
	}
]
```
