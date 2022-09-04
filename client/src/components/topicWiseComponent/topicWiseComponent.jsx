import React from 'react'
import Question from '../../components/question/question';
import { topicWiseProblemSet } from '../../redux/topicwise/topicwiseSelector';
import { connect } from 'react-redux';
import TagsComponent from '../tagsComponent/tagsComponent';

import './topicWiseComponent.scss'



const TopicWiseComponent = ({ topicWiseProblemSet }) => {
    return (
        <div className="d-flex justify-content-around flex-wrap">
            <div className = "topicwise">

                <ol className="list-group">
                    <li className="list-group-item d-flex align-items-start row">
                            <div className = "col-1">#</div>
                            <div>
                                <div>Title</div>
                            </div>
                            <div className = "ml-auto">Comment</div>
                    </li>
                    {   topicWiseProblemSet?.map(e => 
                            <Question key={ e.id } question={ e }/>
                        )
                    }
                </ol>
            </div>
            <TagsComponent/>
        </div>
    )
};

const mapStateToProps = (state) => ({
    topicWiseProblemSet: topicWiseProblemSet(state)
});

export default connect(mapStateToProps)(TopicWiseComponent);