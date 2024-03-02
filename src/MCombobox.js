import React from 'react';

class MComboOptionFake extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            index: props.index,
            text:  props.text,
        }
    }

    render() {
        return (
            <div className="select-fake-menu-item" data-index={this.state.index} onClick={this.props.onClick}>{this.state.text}</div>
        );
    }
}

class MComboOption extends React.Component
{
    constructor(props) {
        super(props);

        this.state =
         {
             value:props.value,
             text :props.text,
             selected: props.selected,
         }
    }

    render()
    {
        return (
            <option value={this.state.value} selected={this.state.selected}>{this.state.text}</option>
        );
    }
}

class MCombobox extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            fake_combo_opened: false,
            fake_combo_text: "FAKE",
            data_list_options: [
                { text:"Option 1"  },
                { text:"Option 2"  },
                { text:"Option 3"  },
                { text:"Option 4"  },
                { text:"Option 5"  },
                { text:"Option 6"  },
                { text:"Option 7"  },
                { text:"Option 8"  },
                { text:"Option 9"  },
                { text:"Option 10" },
            ],
            selected: 0,
        };

        this.list_options      = [];
        this.list_options_fake = [];

        this.handleOnChangeMain    = this.handleOnChangeMain_.bind(this);
        this.handleFakeOnClickMain = this.handleFakeOnClickMain_.bind(this);
        this.handleFakeOnClickItem = this.handleFakeOnClickItem_.bind(this);

        Object.keys(this.state.data_list_options).forEach( (key, index)=> {
            this.list_options.push( <MComboOption value={key} text={this.state.data_list_options[index].text} /> );
            this.list_options_fake.push( <MComboOptionFake text={this.state.data_list_options[index].text} index={index} onClick={this.handleFakeOnClickItem} /> )
        });

        this.setState( { fake_combo_text: this.list_options[this.state.selected].props.text } )
    }

    componentDidMount() {
        //this.setState({ fake_combo_text: this.state.data_list_options[0].text });
        this.setState( { fake_combo_text: this.list_options[this.state.selected].props.text } )
    }

    componentWillUnmount(){}

    handleOnChangeMain_(e) {
        let sel_index = e.target.selectedIndex;
        this.setState({ fake_combo_text: this.state.data_list_options[sel_index].text });
        this.setState( {selected: e.target.value} );
    }

    handleFakeOnClickMain_(e) {
        this.setState({ fake_combo_opened : !this.state.fake_combo_opened });
    }

    handleFakeOnClickItem_(e) {
        let indx = e.target.getAttribute("data-index");

        this.setState( { fake_combo_text: this.list_options[indx].props.text } )
        this.setState( { selected: indx } );
    }

    render()
    {
        return (
            <div class="form-cont">
                <form action="#" method="post">
                <select name="select1" onChange={this.handleOnChangeMain} value={this.state.selected}>
                    {this.list_options}
                </select>
                <div className={ this.state.fake_combo_opened ? "select-fake opened" : "select-fake" } onClick={this.handleFakeOnClickMain}>
                    <span className="select-label">{this.state.fake_combo_text}</span>
                    <span className="select-button"></span>
                    <div className="select-fake-menu-holder">
                        <div className="select-fake-menu">
                            {this.list_options_fake}
                        </div>
                    </div>
                </div>
                </form>
            </div>
        );
    }
}

export default MCombobox;
