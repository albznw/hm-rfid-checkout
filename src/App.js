import './App.css';
import Landing from "./Landing";
import Scanner from "./Scanner";
import Checkout from "./Checkout";
import ThankYou from "./ThankYou";

import React, { Component } from 'react';
const { ipcRenderer } = window.require('electron');


const StateEnum = {
  LANDING: "landing",
  SCANNER: "scanner",
  CHECKOUT: "checkout",
  THANKYOU: "thank-you"
};

const ThankYouPageTimeout = 10000;
const ScannerPageTimeout = 5000;


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: StateEnum.CHECKOUT,
      items: {}
    };

    this.lastPage = this.state.page;
    this.thankYouTimer = undefined;
    this.scannerTimer = undefined;
  }

  componentDidMount() {
    ipcRenderer.on("new-scan", (_, tag) => {
      console.log("Received message from Electron:", tag);
  
      // Check if we are on landing page. If so, progress to scanner page.
      if (this.state.page === StateEnum.LANDING) {
        this.setState({
          page: StateEnum.SCANNER
        });
      }

      this.handleScannedTag(tag)
    });
  }

  handleScannedTag(tag) {
    // Add scanned tag to items object
    if(!this.state.items[tag]) {
      console.log("new item!");
      this.state.items[tag] = tag;
      this.setState({ items: this.state.items });
      this.clearScannerTimer();
      this.setScannerTimer();
    } else {
      console.log("OLD");
    }
  }

  setScannerTimer() {
    if (this.scannerTimer) {
      this.scannerTimer = setTimeout(this.handleScannerTimeout.bind(this), ScannerPageTimeout);
      return this.scannerTimer
    }
  }

  clearScannerTimer() {
    clearTimeout(this.scannerTimer);
    this.scannerTimer = undefined;
  }

  setThankYouTimer() {
    if (this.thankYouTimer === undefined) {
      this.thankYouTimer = setTimeout(this.handleThankYouTimer.bind(this), ThankYouPageTimeout);
      return this.thankYouTimer;
    }
  }

  clearThankYouTimer() {
    clearTimeout(this.thankYouTimer);
    this.thankYouTimer = undefined;
  }

  handleScannerTimeout() {
    this.setState({ page: StateEnum.CHECKOUT });
  }

  handleThankYouTimer() {
    this.setState({ page: StateEnum.LANDING });
  }

  handleCheckoutBtn() {
    this.setState({ page: StateEnum.THANKYOU });
  }

  handleThankYouBtn() {
    this.setState({ page: StateEnum.LANDING });
  }

  getItemsArray() {
    return Object.keys(this.state.items);
  }

  showPage = () => {
    console.log("Showing page", this.state.page);
    switch (this.state.page) {
      case StateEnum.LANDING:
        return <Landing />
      case StateEnum.SCANNER:
        return <Scanner items={this.getItemsArray()} />
      case StateEnum.CHECKOUT:
        return <Checkout items={this.getItemsArray()} btnCallback={() => this.handleCheckoutBtn()} />
      case StateEnum.THANKYOU:
        return <ThankYou btnCallback={() => this.handleThankYouBtn()}/>
    }
  }

  render() {

    switch (this.state.page) {
      case StateEnum.LANDING:
        // Reset timers
        this.clearThankYouTimer();
        if (this.state.items != {}) {
          this.setState({items: {}});
        }
        break;
      case StateEnum.SCANNER:
        if (this.lastPage != this.state.page) {
          // We have changed state. Start timer
          this.setScannerTimer();
        }
        break;
      case StateEnum.CHECKOUT:
        this.clearScannerTimer();
        break;
      case StateEnum.THANKYOU:
        this.setThankYouTimer();
        break;
    }

    // Update current page to last page
    this.lastPage = this.state.page;


    return (
      <div className="App">
        {this.showPage()}
      </div>
    );
  }
}

export default App;
