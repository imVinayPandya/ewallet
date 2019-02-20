import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'
import { Avatar } from '../omg-uikit'
import { useAccount } from '../omg-account/accountProvider'
import styled from 'styled-components'
import WalletDropdownChooser from './WalletDropdownChooser'
import { connect } from 'react-redux'
import { compose } from 'recompose'
const LinksContainer = styled.div`
  display: flex;
  margin-bottom: -1.5px;
  a {
    display: block;
    padding: 0 10px;
    color: ${props => props.theme.colors.S500};
    div.account-link-text {
      border-bottom: 2px solid transparent;
      padding: 30px 0;
    }
  }
  a.navlink-active {
    color: ${props => props.theme.colors.B400};
    div.account-link-text {
      border-bottom: 2px solid ${props => props.theme.colors.S500};
    }
  }
`
const AccountNavigationBarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.S300};
  > div {
    flex: 1 1 auto;
  }
  ${LinksContainer} {
    flex: 0 0 auto;
  }
`

const enhance = compose(
  withRouter,
  connect()
)
// REACT HOOK EXPERIMENT
function AccountNavigationBar (props) {
  const { account, loadingStatus } = useAccount(props.match.params.accountId)
  return (
    <AccountNavigationBarContainer>
      <div>{loadingStatus === 'SUCCESS' && <Avatar name={account.name} />}</div>
      <LinksContainer>
        <NavLink
          to={`/accounts/${props.match.params.accountId}/detail`}
          activeClassName='navlink-active'
        >
          <div className='account-link-text'>Details</div>
        </NavLink>
        <WalletDropdownChooser {...props} />
        <NavLink
          to={`/accounts/${props.match.params.accountId}/transactions`}
          activeClassName='navlink-active'
          className='account-link'
        >
          <div className='account-link-text'>Transactions</div>
        </NavLink>
        <NavLink
          to={`/accounts/${props.match.params.accountId}/requests`}
          activeClassName='navlink-active'
          className='account-link'
        >
          <div className='account-link-text'>Requests</div>
        </NavLink>
        <NavLink
          to={`/accounts/${props.match.params.accountId}/consumptions`}
          activeClassName='navlink-active'
          className='account-link'
        >
          <div className='account-link-text'>Consumptions</div>
        </NavLink>
        <NavLink
          to={`/accounts/${props.match.params.accountId}/users`}
          activeClassName='navlink-active'
          className='account-link'
        >
          <div className='account-link-text'>Users</div>
        </NavLink>
        <NavLink
          to={`/accounts/${props.match.params.accountId}/admins`}
          activeClassName='navlink-active'
          className='account-link'
        >
          <div className='account-link-text'>Admins</div>
        </NavLink>
        <NavLink
          to={`/accounts/${props.match.params.accountId}/setting`}
          activeClassName='navlink-active'
          className='account-link'
        >
          <div className='account-link-text'>Setting</div>
        </NavLink>
      </LinksContainer>
    </AccountNavigationBarContainer>
  )
}

AccountNavigationBar.propTypes = {
  match: PropTypes.object
}

export default enhance(AccountNavigationBar)
