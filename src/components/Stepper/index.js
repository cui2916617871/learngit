import React from 'react'
import PropTypes from 'prop-types'
import CSS from './index.module.css'
import iconAdd1 from '@assets/icon/icon_add1.png'
import iconAdd2 from '@assets/icon/icon_add2.png'
import iconSubtract1 from '@assets/icon/icon_subtract1.png'
import iconSubtract2 from '@assets/icon/icon_subtract2.png'

class Stepper extends React.Component {
    state = {
        count: this.props.initCount || 1,
        canAdd: this.props.initCount < this.props.maxCount,
        canSubtract: this.props.initCount > this.props.minCount,
    }

    refresh() {
        if (this.props.initCount < this.props.maxCount) {
            this.setState({
                canAdd: true,
            })
        } else {
            this.setState({
                canAdd: false,
            })
        }
        if (this.props.initCount > this.props.minCount) {
            this.setState({
                canSubtract: true,
            })
        } else {
            this.setState({
                canSubtract: false,
            })
        }
    }

    addCountAction() {
        let count = this.state.count
        this.props.addValue && this.props.addValue(count + 1)
        if (count >= this.props.maxCount) {
            this.setState({
                canAdd: false,
            })
        } else {
            if (count + 1 >= this.props.maxCount) {
                this.setState({
                    count: count + 1,
                    canAdd: false,
                    canSubtract: true,
                })
            } else {
                this.setState({
                    count: count + 1,
                    canAdd: true,
                    canSubtract: true,
                })
            }
            this.props.changeValue(count + 1)
        }
    }
    subtractCountAction() {
        let count = this.state.count
        this.props.subtractValue && this.props.subtractValue(count - 1)
        if (count <= this.props.minCount) {
            this.setState({
                canSubtract: false,
            })
        } else {
            if (count - 1 <= this.props.minCount) {
                this.setState({
                    count: count - 1,
                    canAdd: true,
                    canSubtract: false,
                })
            } else {
                this.setState({
                    count: count - 1,
                    canAdd: true,
                    canSubtract: true,
                })
            }
            this.props.changeValue(count - 1)
        }
    }

    render() {
        return (
            <div className={this.props.className}>
                <img
                    className={CSS.cellImg}
                    src={this.state.canAdd ? iconAdd1 : iconAdd2}
                    onClick={this.addCountAction.bind(this)}
                    alt=''
                />
                <p className={CSS.cellContent}>{this.state.count}</p>
                <img
                    className={CSS.cellImg}
                    src={this.state.canSubtract ? iconSubtract1 : iconSubtract2}
                    onClick={this.subtractCountAction.bind(this)}
                    alt=''
                />
            </div>
        )
    }
}

Stepper.propTypes = {
    className: PropTypes.string,
    initCount: PropTypes.number,
    minCount: PropTypes.number,
    maxCount: PropTypes.number,
    addValue: PropTypes.func,
    subtractValue: PropTypes.func,
    changeValue: PropTypes.func,
}

Stepper.defaultProps = {
    initCount: 1,
    minCount: 1,
    maxCount: 9999,
}

export default Stepper
