
import React from 'react';

class MComboOptionFake extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            index: props.index,
            text:  props.text,
        }

        this.onOptionFakeClick = props.onclick;
        this.native_el         = React.createRef();
    }

    render() {
        return (
            <div class="select-fake-item" ref={this.native_el} value={this.state.value} index={this.state.index}
                 onClick={this.onOptionFakeClick}>
                {this.state.text}
            </div>
        );
    }
}

class MComboOption extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            index: props.index,
            text:  props.text,
        }

        this.native = React.createRef();
    }

    render() {
        return (
            <option value={this.state.value} index={this.state.index}>{this.state.text}</option>
        );
    }
}

export default class MCombobox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: "",
        }

        this.data_options      = props.data_options;
        this.list_options      = [];
        this.list_options_fake = [];

        this.onSelectChange         = this.onSelectChange_.bind(this);
        this.onOptionFakeClick      = this.onOptionFakeClick_.bind(this);
        this.setComboItemFakeActive = this.setComboItemFakeActive_.bind(this);
        this.onComboFakeClick       = this.onComboFakeClick_.bind(this);
        this.onBodyClickHide        = this.onBodyClickHide_.bind(this);

        this.data_options.forEach( (val, index) => {
            this.list_options.push( <MComboOption value={val} index={index} text={val} /> );
            this.list_options_fake.push( <MComboOptionFake value={val} index={index} text={val} onclick={this.onOptionFakeClick} /> );
        } );

        this.native_el_ref    = React.createRef();
        this.native_fake_val  = React.createRef();
        this.native_fake_menu = React.createRef();
        this.native_fake_main = React.createRef();
    }

    onComboFakeClick_(e) {
        e.preventDefault();
        e.stopPropagation();
        this.native_fake_main.current.classList.toggle("opened");
        if( this.native_fake_main.current.classList.contains("opened") ) {
            document.addEventListener( "click", this.onBodyClickHide );
        }
        else {
            document.removeEventListener( "click", this.onBodyClickHide );
        }
    }

    onOptionFakeClick_(e) {
        let src_index = e.target.getAttribute("index");
        let src_value = e.target.getAttribute("value");
        this.native_fake_val.current.textContent = src_value;
        this.setState({ selected: src_value });
        this.native_el_ref.current.selectedIndex = src_index;

        this.setComboItemFakeActive_(parseInt(src_index));
    }

    onSelectChange_(e) {
        let selected_index = this.native_el_ref.current.selectedIndex;
        let selected_val   = this.native_el_ref.current.options[selected_index].value;
        this.setState({ selected: selected_val });
        this.native_fake_val.current.textContent = selected_val;

        this.setComboItemFakeActive(selected_index);
    }

    setComboItemFakeActive_(selected_index) {
        this.native_fake_menu.current.childNodes.forEach( (val, index) => {
            if( index === selected_index ) {
                this.native_fake_menu.current.childNodes[index].classList.add("selected");
            }
            else {
                this.native_fake_menu.current.childNodes[index].classList.remove("selected");
            }
        } );
    }

    onBodyClickHide_(e) {
        Array.from( document.querySelectorAll(".select-fake.opened") ).forEach( function(val, index){
            val.classList.remove("opened");
        } );
    }

    render() {
        return (
            <div class="main">
                <select value={this.state.selected} onChange={this.onSelectChange} ref={this.native_el_ref}>
                    {this.list_options}
                </select>
                <div class="select-fake" ref={this.native_fake_main} onClick={this.onComboFakeClick}>
                    <div class="select-fake-value" ref={this.native_fake_val}>Option 1</div>
                    <div class="select-fake-menu" ref={this.native_fake_menu}>
                        {this.list_options_fake}
                    </div>
                </div>
            </div>
        );
    }
}
