# H&M RFID Checkout Proof-of-concept
This Proof-of-Concept Electron application showcases the abilities to use the rfid chip in the price-tags to scan and purchase products from H&M.

## Running the application

In order to run this application you have to have Node.JS installed on your system as well as sufficient permissions for Node.JS to interface with USB HID devices connected to your computer. To enable the right permissions on a Raspberry Pi 3 you can follow [this](#USB-HID-Permissions-on-Raspberry-Pi-3B) guide.
### Prerequisites
```sh
$ npm install
```

### Run
As of now the application has not been ejected and thus you have to start it in development mode.
```sh
$ npm run dev
```

## USB HID Permissions on Raspberry Pi 3B
To open (read and write) a hid device the user has to have special permissions. I've tried the following [tutorial](https://unix.stackexchange.com/questions/85379/dev-hidraw-read-permissions/85459) and it proved to work for med on my Raspberry Pi 3B. Doing this enabled my Electron application to open the hid device in question.

Add a file named `99-hidraw-permissions.rules` to: `/etc/udev/rules.d/`
```plain text
SUBSYSTEM=="usb", ATTR{idVendor}=="1a86", ATTR{idProduct}=="e010", MODE="0666", GROUP="plugdev", TAG+="uaccess", TAG+="udev-acl"
KERNEL=="hidraw*", MODE="0666", GROUP="plugdev", TAG+="uaccess", TAG+="udev-acl"
```