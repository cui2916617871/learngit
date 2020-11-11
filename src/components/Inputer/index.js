import React from 'react'
import PropTypes from 'prop-types'
import CSS from './index.module.css'
import Iconfont from '@components/Iconfont'
import BaseComponent from '../../base/BaseComponent'
import IconCodeEmum from '@components/Iconfont/iconCodeEmum'

class Inputer extends BaseComponent {
    state = {
        value: this.props.value || '',
        isFocus: false || this.props.isFocus,
    }

    forwardRef = React.createRef()

    UNSAFE_componentWillReceiveProps(nextProps) {
        let newState = {}

        if (nextProps.value !== this.props.value) {
            newState.value = nextProps.value
        }
        if (nextProps.isFocus !== this.props.isFocus) {
            newState.isFocus = nextProps.isFocus
            if (nextProps.isFocus) (this.props.forwardRef || this.forwardRef).current.focus()
            else (this.props.forwardRef || this.forwardRef).current.blur()
        }

        this.setState(newState)
    }

    componentDidMount() {
        document.addEventListener('touchend', this.touchstartAction.bind(this))
    }
    componentWillUnmount() {
        document.removeEventListener('touchend', this.touchstartAction.bind(this))
    }

    touchstartAction(e) {
        console.log(e)
        if (e.target.name && e.target.name !== 'input') {
            ;(this.props.forwardRef || this.forwardRef).current.blur()
        }
    }

    clearAction() {
        this.setState({
            value: '',
        })
        this.props.onChange && this.props.onChange('')
    }

    valueChangeAction(e) {
        this.setState({
            value: e.target.value,
        })
        this.props.onChange && this.props.onChange(e.target.value)
    }

    focusAction() {
        if (this.props.focusAction) {
            this.props.focusAction()
        }
        this.setState({
            isFocus: true,
        })
    }

    blurAction() {
        if (this.props.blurAction) {
            this.props.blurAction()
        }
        let self = this
        setTimeout(function() {
            self.setState({
                isFocus: false,
            })
        }, 100)
    }

    render() {
        return (
            <div
                className={`${CSS.inputer} ${this.props.className}`}
                style={{ ...this.props.style, width: this.props.width || '100%' }}
            >
                <input
                    name='input'
                    className={this.props.subClassName}
                    ref={this.props.forwardRef || this.forwardRef}
                    type={this.props.type}
                    pattern={this.props.type === 'number' ? '[0-9]*' : ''}
                    placeholder={this.props.placeholder}
                    required
                    maxLength={this.props.maxlength || 9999}
                    value={this.state.value}
                    style={this.props.inputStyle}
                    onFocus={this.focusAction.bind(this)}
                    onBlur={this.blurAction.bind(this)}
                    onChange={this.valueChangeAction.bind(this)}
                />
                <div
                    className={`${CSS.clearSection} ${this.state.isFocus ? CSS.isFocus : ''}`}
                    onClick={this.clearAction.bind(this)}
                >
                    <Iconfont font={IconCodeEmum.CLEAR} style={{ fontSize: '.28rem', color: '#D8D8D8' }} />
                </div>
            </div>
        )
    }
}

Inputer.propTypes = {
    type: PropTypes.string,
    inputStyle: PropTypes.object,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    changeValue: PropTypes.func,
}

Inputer.defaultProps = {
    inputStyle: {},
}

export default React.forwardRef((props, ref) => {
    return <Inputer {...props} forwardRef={ref} />
})
