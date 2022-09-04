import React from 'react'
import Question from '../../components/question/question';
import {topicWiseProblemSet} from '../../redux/topicwise/topicwiseSelector';
import {connect} from 'react-redux';
import TagsComponent from '../tagsComponent/tagsComponent';

import './topicWiseComponent.scss'



const TopicWiseComponent = ({topicWiseProblemSet, topic}) => {
    return (
        <div className="d-flex justify-content-around flex-wrap mb-5">
            <div className = "topicwise">
                <h4>{topic}</h4>
                <ol className="list-group">
                    <li className="list-group-item d-flex">
                        <div className="pr-4">#</div>
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