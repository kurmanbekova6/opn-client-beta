import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import Modal from "react-modal";
import { connect } from "react-redux";

/* Custom ui */
import { renderInputField } from "../../ui_components/utils/Inputs";
import { Redirect } from "react-router";
import { Container } from "reactstrap";

// connect to html tag
Modal.setAppElement("#opkTokenAdded");

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 10,
  },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "initial",
    bottom: "initial",
    maxWidth: "500px",
    border: 0,
    background: "#fff",
    overflow: "visible",
    WebkitOverflowScrolling: "touch",
    outline: "none",
    borderRadius: 0,
    padding: "20px",
    transform: "translate(-50%, -50%)",
  },
};

class FinancialForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3js: null,
      opkToken: {
        type: "ERC20",
        symbol: "OPK",
        address: "0xaa484e0efa8c5d29463cbb515742957a258bbad5",
        image: "https://opnplatform.com/static/opk-icon-144x144.png",
        decimals: 18,
      },
      metamask: {
        id: null,
        balance: null,
        errorMessage: null,
      },
      errorMessage: null,
    };
  }

  componentDidMount() {
    this.thereIsMetamask();
    this.interval = setInterval(() => this.thereIsMetamask(), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  closePaymentModal = () => this.setState({ errorMessage: false });

  thereIsMetamask = () => {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== "undefined") {
      // Use Mist/MetaMask's provider
      // web3js = new Web3(web3.currentProvider);
      // this.setState({ web3js: new Web3(web3.currentProvider) });
      this.setState(
        prevState => ({
          web3js: new Web3(window.web3.currentProvider),
          metamask: {
            ...prevState.metamask,
            errorMessage: false,
          },
        }),
        () => {
          window.ethereum.enable();
          this.metamaskIsLocked();
        }
      );
    } else {
      this.setState(prevState => ({
        metamask: {
          ...prevState.metamask,
          errorMessage: "You must install MetaMask extension",
        },
      }));
    }
  };

  metamaskIsLocked = () => {
    const { web3js } = this.state;

    // web3 has to be injected/present
    if (web3js.eth.accounts.length) {
      // if not locked, get account
      this.setState(
        prevState => ({
          metamask: {
            ...prevState.metamask,
            id: web3js.eth.accounts[0],
            errorMessage: false,
          },
        }),
        // () => this.checkMetamaskNetwork()
        () => this.checkMetamaskNetwork()
      );
    } else {
      // locked. update UI. Ask user to unlock.
      this.setState(prevState => ({
        metamask: {
          ...prevState.metamask,
          errorMessage: "You must log in to MetaMask",
        },
      }));
    }
  };

  checkMetamaskNetwork = () => {
    const { web3js } = this.state;

    const mainNetwork = 1;
    if (web3js.version.network != mainNetwork) {
      return this.setState(
        prevState => ({
          metamask: {
            ...prevState.metamask,
            errorMessage: "Please switch to main network.",
          },
        }),
        () => this.checkMetamaskAccountBalance()
      );
    } else {
      this.checkMetamaskAccountBalance();
    }
  };

  checkMetamaskAccountBalance = () => {
    const { web3js, metamask } = this.state;

    web3js.eth.getBalance(metamask.id, (err, balance) => {
      const balanceInEth = web3js.fromWei(balance, "ether");
      this.setState(prevState => ({
        metamask: {
          ...prevState.metamask,
          balance: balanceInEth,
        },
      }));
    });
  };

  render() {
    const { metamask } = this.state;
    return (
      <div className="financial-form">
        {!this.props.isLoggedIn ? <Redirect to="/login" /> : <React.Fragment />}

        {metamask.errorMessage ? (
          <p className="financial-form__error">{metamask.errorMessage}</p>
        ) : (
          <form>
            <Field
              name="amount"
              label="Amount ETH"
              placeholder=""
              component={renderInputField}
              input={{
                value: metamask.balance,
                disabled: true,
              }}
              type="text"
            />
            <Field
              name="wallet"
              label="Your wallet"
              placeholder=""
              component={renderInputField}
              input={{
                value: metamask.id,
                disabled: true,
              }}
              type="text"
            />

            <button
              className="main-btn"
              type="button"
              onClick={async event => {
                const { opkToken } = this.state;

                const provider = window.web3.currentProvider;
                provider.sendAsync(
                  {
                    method: "metamask_watchAsset",
                    params: {
                      type: opkToken.type,
                      options: {
                        address: opkToken.address,
                        symbol: opkToken.symbol,
                        decimals: opkToken.decimals,
                        image: opkToken.image,
                      },
                    },
                    id: Math.round(Math.random() * 100000),
                  },
                  (err, added) => {
                    if (err || "error" in added) {
                      this.setState({
                        errorMessage: "Something is wrong, try again",
                      });
                      return;
                    }
                    this.setState({
                      errorMessage: "OPK token successfully added",
                    });
                  }
                );
              }}
            >
              ADD OPK TOKEN
            </button>
          </form>
        )}

        <Modal
          isOpen={this.state.errorMessage}
          onRequestClose={this.closePaymentModal}
          shouldCloseOnEsc={true}
          contentLabel="Payment modal"
          style={modalStyles}
        >
          <div className="product-order-modal-content_wrapper">
            <div className="product-order-modal__title">Notification</div>
            <button
              className="product-order-modal__close-btn"
              onClick={this.closePaymentModal}
            >
              X
            </button>

            <p className="product-order-modal-content__info">
              {this.state.errorMessage}
            </p>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.loginStatus,
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: "financial_info",
  })(FinancialForm)
);
