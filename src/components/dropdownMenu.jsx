import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';

export default class dropdownMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isListOpen: false,
      headerTitle: this.props.title
    }
  }

  toggleList = () => {
    this.setState(prevState => ({
      isListOpen: !prevState.isListOpen
   }))
 }

  selectItem = (item) => {
    const { resetThenSet } = this.props;
    const { title, id, key } = item;

    this.setState({
      headerTitle: title,
      isListOpen: false,
    }, () => resetThenSet(id, key));
  }

  render() {
    const { isListOpen, headerTitle } = this.state;
    const { list } = this.props;

    return (
      <div className="dd-wrapper">
        <button
          type="button"
          className="dd-header"
          onClick={this.toggleList}
        >
          {headerTitle}
          {isListOpen
            ? <FontAwesome name="angle-up" size="2x" />
            : <FontAwesome name="angle-down" size="2x" />
          }

        </button>
        {isListOpen && (
          <ul className="dd-list">
            {list.map((item) => (
              <li className="dd-list__item" key={item.id}>
                <button
                  type="button"
                  onClick={() => this.selectItem(item)}
                >

                  {item.title}
                  {' '}
                  {item.selected && <FontAwesome name="check" />}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}
