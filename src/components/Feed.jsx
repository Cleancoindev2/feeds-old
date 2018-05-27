import React, { Component } from 'react';
import Link from './Link';
import moment from 'moment';
import web3 from '../web3';

class Feed extends Component {
  render() {
    const value = web3.toBigNumber(this.props.value).toFixed(3);
    const expires = moment.duration(this.props.expires, "seconds").humanize(true);
    const updated = this.props.updated ? moment.unix(this.props.updated).fromNow() : this.props.updated;
    const color = this.props.expires < 0 ? 'red' : ( this.props.expires < 2700 ? 'orange' : '#444');
    //const balance = web3.fromWei(this.props.balance).toFixed(3);
    let provider = 'MakerDAO'
    if (this.props.idx === 1) {
      provider = 'Rhombus Network'
    } else if (this.props.idx === 2) {
      provider = '#ETHBuenosAires Hackathon Team!'
    }
    return (
      this.props.network === 'kovan' ?
      <div>
        <p>
          <b>{this.props.idx + 1}</b> {value} <Link href={`https://${this.props.network === 'kovan' ? 'kovan.' : ''}etherscan.io/address/${this.props.address}`} text={this.props.address} />
        </p>
        <p>
          Oracle provided by <b>{provider}</b>
        </p>
      </div>
      :
      <div>
        <p style={{color}}>
          <b>{this.props.idx + 1}</b> {value} {this.props.valid && this.props.expires > 0 ? 'expires' : 'expired'} {expires}.{updated && `Updated ${updated}.`} <Link href={`https://${this.props.network === 'kovan' ? 'kovan.' : ''}etherscan.io/address/${this.props.address}`} text={this.props.address} />
        </p>
      </div>
    );
  }
}

export default Feed;
