import React, { Component } from 'react'

const CheckIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
    />
  </svg>
);

const AngleDownIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"
    />
  </svg>
);

const AngleUpIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"
    />
  </svg>
);

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
    const { updateArcadeList } = this.props;
    const { title, id, key } = item;

    this.setState({
      headerTitle: title,
      isListOpen: false,
    }, () => updateArcadeList(id, key));
  }

  render() {
    const { isListOpen, headerTitle } = this.state;
    const { list } = this.props;

    return (
      <div className="dd-wrapper">
        <button
          type="button"
          className="dd-header btn-glossy btn-glossy--secondary"
          onClick={this.toggleList}
        >
          {headerTitle}
          {' '}
          {isListOpen
            ? <AngleUpIcon className="dd-icon" />
            : <AngleDownIcon className="dd-icon" />}

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
                  {item.selected && <CheckIcon className="dd-icon dd-icon--flat" />}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}
