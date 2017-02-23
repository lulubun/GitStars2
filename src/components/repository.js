import React from 'react';
import {connect} from 'react-redux';

import StarRater from './star-rater';

import * as actions from '../actions/index';

export class Repository extends React.Component {
    constructor(props) {
        super(props);
        this.changeRating = this.changeRating.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(
            actions.fetchDescription(this.props.repository.name)
        );
    }

    changeRating(rating) {
        this.props.dispatch(
            actions.rateRepository(this.props.repository.name, rating)
        );
    }

    render() {
        return (
            <div className="repository">
                {this.props.repository.name} - {this.props.repository.description}
                &nbsp;
                <StarRater rating={this.props.repository.rating}
                           onChange={this.changeRating} />
            </div>
        );
    }
}

export default connect()(Repository);
