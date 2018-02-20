require('tachyons/css/tachyons.min.css')
require('react-table/react-table.css')

const React = require('react')
const PropTypes = require('prop-types')
const { render } = require('react-dom')
const Table = require('react-table').default

class App extends React.Component {
  constructor(...args) {
    super(...args)
    
    this.state = {
      loading: true,
      trades: []
    }
  }
  componentDidMount() {
    fetch('http://127.0.0.1:8090/trades', {cors: true}).then((res) => {
      res.json().then((parsed) => {
        this.setState({
          loading: false,
          trades: parsed
        })
      })
    })
  }

  render () {
    const { loading, trades } = this.state

    return (
      <Table
        loading={loading}
        columns={[
          { Header: 'Provider', accessor: 'LiquidityProvider' },
          { Header: 'Client', accessor: 'Client' },
          { Header: 'Volume', accessor: 'volume' },
          { Header: 'Latency', accessor: 'latency' }
        ]}
        data={trades}
      />
    )
  }
}

render(<App />, document.getElementById('app'))
