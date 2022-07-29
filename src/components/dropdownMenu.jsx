import React, { Component } from 'react'

export default class dropdownMenu extends Component {sendData = () => {
  this.props.parentCallback("arcade86");
}
  constructor(props) {
    super(props)
    this.state = {
      isListOpen: false,
      headerTitle: this.props.list[0].title
    }
  }

  render() {
    const { isListOpen, headerTitle } = this.state;
    const { list } = this.props;

    const toggleList = () => {
      this.setState({ isListOpen: !isListOpen })
    }

    const selectItem = (item) => {
      const { resetThenSet } = this.props;
      const { title, id, key } = item;

      this.setState({
        headerTitle: title,
        isListOpen: false
      }, () => resetThenSet(id, key));
    }

    return (
      <div className="dd-wrapper">
        <button
          type="button"
          className="dd-header"
          onClick={toggleList}
        >
          {headerTitle}

        </button>
        {isListOpen && (
          <ul className="dd-list">
            {list.map((item, index) => (
              <li className="dd-list__item" key={index}>
                <button
                  type="button"
                  onClick={() => this.selectItem(item)}
                >

                  {item.title}
                  {' '}
                  {item.selected && <span className="dd-list-item-selected">&#10004;</span>}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}
