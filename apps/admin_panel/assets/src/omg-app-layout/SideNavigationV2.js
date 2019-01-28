import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'
import { Icon, Avatar } from '../omg-uikit'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import CurrentAccountProvider from '../omg-account-current/currentAccountProvider'
import { fuzzySearch } from '../utils/search'
const SideNavigationContainer = styled.div`
  background-color: #F0F2F5;
  height: 100%;
  padding: 50px 0;
  overflow: auto;
`
const NavigationItem = styled.div`
  padding: 5px 35px;
  white-space: nowrap;
  letter-spacing: 1px;
  text-align: left;
  font-size: 14px;
  background-color: ${props => (props.active ? props.theme.colors.S300 : 'transparent')};
  transition: 0.1s background-color;
  span {
    vertical-align: middle;
  }
  i {
    margin-right: 15px;
    font-size: 14px;
    color: ${props => props.theme.colors.S500};
  }
  :hover {
    background-color: ${props => props.theme.colors.S300};
  }
`
const progress = keyframes`
0% {
      background-position: -200px 0;
  }
  100% {
      background-position: calc(200px + 100%) 0;
  }
`

const NavigationItemsContainer = styled.div`
  margin-top: 20px;
  a {
    color: inherit;
  }
`
const SwitchAccountButton = styled.button`
  padding: 5px 15px;
  display: inline-block;
  font-weight: 300;
  border-radius: 4px;
  border: 1px solid;
  border-color: ${props => (props.active ? 'transparent' : props.theme.colors.B100)};
  letter-spacing: 1px;
  white-space: nowrap;
  color: ${props => props.theme.colors.B100};
  cursor: pointer;
  background-color: ${props => (props.active ? props.theme.colors.B400 : 'transparent')};
  span {
    display: inline-block;
    margin-bottom: 2px;
    vertical-align: middle;
  }
  :hover {
    background-color: ${props => props.theme.colors.B400};
  }
`
const SwitchAccount = styled.div`
  background-color: ${props => (props.active ? props.theme.colors.B400 : 'transparent')};
  margin-bottom: 25px;
  padding: 8px 35px;
  text-align: left;
  margin-top: 25px;
`
const CurrentAccountContainer = styled.div`
  text-align: left;
  display: flex;
  align-items: center;
  padding: 0 35px;
`
const CurrentAccountName = styled.h4`
  flex: 1 1 auto;
  margin-left: 15px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const BigAvatar = styled(Avatar)`
  text-align: center;
  line-height: 36px;
  background-color: ${props => props.theme.colors.B200};
  color: white;
  font-size: 14px;
  width: 36px;
  height: 36px;
`
const LoadingLogo = styled(Avatar)`
  width: 36px;
  height: 36px;
  background-color: ${props => props.theme.colors.B200};
  background-image: ${props =>
    `linear-gradient(90deg, ${props.theme.colors.B200}, grey, ${props.theme.colors.B200})`};
  background-size: 200px 100%;
  background-repeat: no-repeat;
  animation: ${progress} 1.5s ease-in-out infinite;
`
class SideNavigation extends PureComponent {
  static propTypes = {
    location: PropTypes.object,
    className: PropTypes.string,
    onClickSwitchAccount: PropTypes.func,
    switchAccount: PropTypes.bool,
    match: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.dataLink = [
      { icon: 'Dashboard', to: '/dashboard', text: 'Dashboard' },
      { icon: 'Merchant', to: '/accounts', text: 'Accounts' },
      { icon: 'Token', to: '/tokens', text: 'Tokens' },
      { icon: 'Wallet', to: '/wallets', text: 'Wallets' },
      { icon: 'Transaction', to: '/transaction', text: 'Transactions' },
      { icon: 'Request', to: '/requests', text: 'Requests' },
      { icon: 'Consumption', to: '/consumptions', text: 'Consumptions' },
      { icon: 'Key', to: '/api', text: 'Api Keys' },
      { icon: 'People', to: '/users', text: 'Users' },
      { icon: 'Setting', to: '/activity', text: 'Activity Logs' },
      { icon: 'Setting', to: '/configuration', text: 'Configurations' },
      { icon: 'Setting', to: '/setting', text: 'Settings' }
    ]
  }
  renderCurrentAccount = ({ currentAccount, loadingStatus }) => {
    return (
      <CurrentAccountContainer>
        {loadingStatus === 'SUCCESS' ? (
          <BigAvatar
            image={_.get(currentAccount, 'avatar.large')}
            name={
              _.get(currentAccount, 'avatar.large')
                ? _.get(currentAccount, 'avatar.large')
                : _.get(currentAccount, 'name').slice(0, 2)
            }
          />
        ) : (
          <LoadingLogo />
        )}
        <CurrentAccountName>{_.get(currentAccount, 'name', '')}</CurrentAccountName>
      </CurrentAccountContainer>
    )
  }

  render () {
    const accountIdFromLocation = this.props.match.params.accountId
    return (
      <SideNavigationContainer className={this.props.className}>
        <NavigationItemsContainer>
          <CurrentAccountProvider render={this.renderCurrentAccount} />
          <SwitchAccount active={this.props.switchAccount}>
            <SwitchAccountButton
              active={this.props.switchAccount}
              onClick={this.props.onClickSwitchAccount}
            >
              <span>Switch Account</span> <Icon name='Chevron-Right' />
            </SwitchAccountButton>
          </SwitchAccount>
          {this.dataLink.map(link => {
            return (
              <Link to={`/${accountIdFromLocation}${link.to}`} key={link.to}>
                <NavigationItem active={fuzzySearch(link.to, this.props.location.pathname)}>
                  <Icon name={link.icon} /> <span>{link.text}</span>
                </NavigationItem>
              </Link>
            )
          })}
        </NavigationItemsContainer>
      </SideNavigationContainer>
    )
  }
}
export default withRouter(SideNavigation)