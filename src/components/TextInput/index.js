/**
 * Created by lei_sun on 2019/7/30.
 */
import React from 'react'
import BaseComponent from '../../base/BaseComponent'

/*
    props:
    1. rows: if rows > 1 display textarea, else display input
    2. type: input used, text, password, number ...
    3. placeholder: input, textarea all used
    4. onChange: function, return user input.
    5. unusedComposition: true or false
    6. maxlength
 */

class TextInput extends BaseComponent {
    constructor(props) {
        super(props)

        this.state = {
            rows: this.props.rows || 1,
            type: this.props.type || 'text',
            placeholder: this.props.placeholder || '',
            value: this.props.value || '',
        }

        if (!this.props.unusedComposition) this.isCompositionEnd = true
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        //console.log('getDerivedStateFromProps', nextProps, prevState)

        if (nextProps.placeholder !== prevState.placeholder || nextProps.value !== prevState.value) {
            return {
                ...prevState,
                placeholder: nextProps.placeholder,
                value: nextProps.value,
            }
        }

        return null
    }

    handlingComposition() {
        console.log('handlingComposition')
        this.isCompositionEnd = false
    }

    handleComposition(e) {
        console.log('handleComposition')
        this.isCompositionEnd = true
        this.doChange(e)
    }
    setValue(value) {
        this.setState({
            value: value,
        })
    }
    setFocus(flag) {
        const { rows } = this.state

        if (rows > 1) {
            if (this.refs['textarea']) {
                if (flag) {
                    this.refs['textarea'].focus()
                } else {
                    this.refs['textarea'].blur()
                }
            }
        } else {
            if (this.refs['input']) {
                if (flag) {
                    this.refs['input'].focus()
                } else {
                    this.refs['input'].blur()
                }
            }
        }
    }
    setValueInit() {
        const { rows } = this.state
        if (rows > 1) {
            if (this.refs['textarea']) {
                this.refs['textarea'].value = ''
            }
        } else {
            if (this.refs['input']) {
                this.refs['input'].value = ''
            }
        }

        if (!this.props.unusedComposition) {
            if (this.isCompositionEnd) {
                this.props.onChange && this.props.onChange('')
            }
        } else {
            this.props.onChange && this.props.onChange('')
        }
    }
    doChange(e) {
        //console.log('doChange', e.target.value, this.isCompositionEnd, this.props.unusedComposition)
        if (!this.props.unusedComposition) {
            if (this.isCompositionEnd) {
                this.props.onChange && this.props.onChange(e.target.value)
            }
        } else {
            this.props.onChange && this.props.onChange(e.target.value)
        }
    }

    render() {
        const { style, className, unusedComposition, ...props } = this.props
        const { rows, type, placeholder, value } = this.state

        props.value !== undefined && delete props.value

        if (!unusedComposition) {
            return (
                <React.Fragment>
                    {rows > 1 ? (
                        <textarea
                            {...props}
                            ref={'textarea'}
                            rows={rows}
                            style={style}
                            defaultValue={value}
                            className={className}
                            placeholder={placeholder}
                            onCompositionStart={() => this.handlingComposition()}
                            onCompositionUpdate={() => this.handlingComposition()}
                            onCompositionEnd={e => this.handleComposition(e)}
                            onChange={e => this.doChange(e)}
                        />
                    ) : (
                        <input
                            {...props}
                            ref={'input'}
                            type={type}
                            style={style}
                            className={className}
                            defaultValue={value}
                            placeholder={placeholder}
                            onCompositionStart={() => this.handlingComposition()}
                            onCompositionUpdate={() => this.handlingComposition()}
                            onCompositionEnd={e => this.handleComposition(e)}
                            onChange={e => this.doChange(e)}
                        />
                    )}
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    {rows > 1 ? (
                        <textarea
                            {...props}
                            ref={'textarea'}
                            rows={rows}
                            style={style}
                            className={className}
                            value={value}
                            placeholder={placeholder}
                            onChange={e => this.doChange(e)}
                        />
                    ) : (
                        <input
                            {...props}
                            ref={'input'}
                            type={type}
                            style={style}
                            className={className}
                            value={value}
                            placeholder={placeholder}
                            onChange={e => this.doChange(e)}
                        />
                    )}
                </React.Fragment>
            )
        }
    }
}

export default TextInput
