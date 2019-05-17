import React from 'react'
import {
  View,
  Text,
  NetInfo,
  StyleSheet,
  ActivityIndicator
} from 'react-native'

/** ==============================================
 * @name withNoConnection
 * @description เป็น Higher order component (HOC)
 * สำหรับใช้ตรวจสอบ Connection internet
 * @version
 * ============================================ */
const withNoConnection = (Screen) => {
  class NoConnection extends React.Component {
    constructor (props) {
      super(props)

      this.state = {
        isConnected: null
      }

      this._handleConnectivityChange = this._handleConnectivityChange.bind(this)
    }

    componentDidMount () {
      NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectivityChange)
      NetInfo.isConnected.fetch().done((isConnected) => { this.setState({ isConnected }) })
    }

    componentWillUnmount () {
      NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectivityChange)
    }

    _handleConnectivityChange (isConnected) {
      this.setState({ isConnected })
    }

    render () {
      const { isConnected } = this.state

      return (
        <View style={{ flex: 1 }}>
          <Screen />

          { /** =============================================
            * @description ถ้าหากไม่ได้ต่อ internet จะแสดงหน้าจอ
            * ว่าไม่ได้ต่อ internet ขึ้นมาบัง Screen ไว้
            * =========================================== */
            !isConnected &&
            <View style={[StyleSheet.absoluteFill, styles.bg]}>
              <ActivityIndicator size='large' />

              <View style={styles.containerFont}>
                <Text style={styles.fontData}>
                  NO INTERNET CONNECTION
                </Text>
              </View>
            </View>
          }
        </View>
      )
    }
  }

  return NoConnection
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center'
  },
  containerFont: {
    padding: 10,
    marginTop: 15,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: 'rgb(102,102,255)'
  },
  fontData: {
    color: '#ffffff',
    fontWeight: 'bold'
  }
})

export default withNoConnection
