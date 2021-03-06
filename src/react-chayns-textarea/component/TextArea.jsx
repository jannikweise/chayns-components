import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import assign from 'object-assign';

export default class TextArea extends React.Component {
    static propTypes = {
        style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
        className: PropTypes.string,
        placeholder: PropTypes.string,
        required: PropTypes.bool,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        defaultValue: PropTypes.string,
        value: PropTypes.string,
        onKeyUp: PropTypes.func,
        onKeyDown: PropTypes.func,
        autogrow: PropTypes.bool,
        reference: PropTypes.func
    };

    static defaultProps = {
        style: null,
        className: null,
        placeholder: null,
        required: null,
        onChange: null,
        onBlur: null,
        defaultValue: undefined,
        value: undefined,
        onKeyUp: null,
        onKeyDown: null,
        autogrow: null,
        reference: null,
    };

    static defaultStyle = {
        width: '100%',
        paddingBottom: '12px'
    };

    componentDidMount() {
        if (this.props.required) {
            this._node.setAttribute('required', '');
        }

        if (this.props.autogrow) {
            this.offset = this._node.offsetHeight - this._node.clientHeight;

            this.initialHeight = `${this._node.scrollHeight + this.offset}px`;

            if (!this.props.defaultValue) {
                this.grow();
            } else {
                this.grow('0');
            }
        }
    }

    onChange = () => {
        if (this.props.onChange) {
            this.props.onChange(this._node.value);
        }

        if (this.props.autogrow) {
            if (this._node.value === '') {
                this.grow(this.initialHeight);
            } else {
                this.grow('0');
            }
        }
    };

    onBlur = () => {
        if (this.props.onBlur) {
            this.props.onBlur(this._node.value);
        }
    };

    ref = (node) => {
        this._node = node;

        if (this.props.reference) {
            this.props.reference(node);
        }
    };

    grow(initHeight) {
        if (initHeight) {
            this._node.style.height = initHeight;
        }

        if (this._node.scrollHeight + this.offset > 0) {
            this._node.style.height = `${this._node.scrollHeight + this.offset}px`;
        }
    }

    render() {
        const style = assign({}, this.defaultStyle, this.props.style);

        const className = classnames({
            input: true,
            [this.props.className]: this.props.className
        });

        return (
            <textarea
                className={className}
                ref={this.ref}
                placeholder={this.props.placeholder}
                style={style}
                defaultValue={this.props.defaultValue}
                onChange={(this.props.onChange || this.props.autogrow) ? this.onChange : null}
                onBlur={this.props.onBlur ? this.onBlur : null}
                onKeyUp={this.props.onKeyUp}
                onKeyDown={this.props.onKeyDown}
                value={this.props.value}
            />
        );
    }
}
