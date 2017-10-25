import '../stylesheets/app.css';

import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

import voting_artifacts from '../../build/contracts/Voting.json'

var Voting = contract(voting_artifacts);

let candidates = {'Alicia': 'candidate-1', 'Diego': 'candidate-2', 'Jose': 'candidate-3'}

window.voteForCandidate = function(event) {
  let $selectCandidate = $('#candidate');
  let $voteButton = $(event);
  let $loader = $('.loader');
  let candidateName = $('#candidate').val();

  console.log(candidateName)
  try {
    $voteButton.addClass('disabled');
    $loader.removeClass('invisible');

    Voting.deployed().then(function(contractInstance) {
      contractInstance.voteForCandidate(candidateName, {gas: 140000, from: web3.eth.accounts[0]}).then(function() {
        return contractInstance.totalVotesFor.call(candidateName).then(function(v) {
          $('#' + candidates[candidateName]).html(v.toString());
          $voteButton.removeClass('disabled')
          $loader.addClass('invisible')
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
}

$( document ).ready(function() {
  if (typeof web3 !== 'undefined') {
    console.warn('Using web3 detected from external source like Metamask')
    window.web3 = new Web3(web3.currentProvider);
  } 
  else {
    console.warn('No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask');
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  }

  Voting.setProvider(web3.currentProvider);
  let candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    Voting.deployed().then(function(contractInstance) {
      contractInstance.totalVotesFor.call(name).then(function(v) {
        $('#' + candidates[name]).html(v.toString());
      });
    })
  }
});
