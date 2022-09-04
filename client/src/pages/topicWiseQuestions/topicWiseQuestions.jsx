import React, {useEffect} from 'react';
import {fetchTopicwise} from '../../redux/topicwise/topicwiseAction';
import {isLoaded} from '../../redux/topicwise/topicwiseSelector';
import WithSpinner from '../../components/withSpinner/withSpinner';
import TopicWiseComponent from '../../components/topicWiseComponent/topicWiseComponent'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';


const TopicWiseWithSpinner = WithSpinner(TopicWiseComponent);

const TopicWiseQuestions = ({fetchTopicwise, isLoaded, match}) => {
    const topic = match.params.topic;
    useEffect(() => {
        const fetchTopicWise = (topic) => fetchTopicwise(topic);
        fetchTopicWise(topic);
    }, [topic, fetchTopicwise]);
    return (
        <TopicWiseWithSpinner isLoading={!isLoaded}/>
    )
}

const mapDispatchToProps = (dispatch) => ({
    fetchTopicwise: (topic) => dispatch(fetchTopicwise(topic))
})

const mapStateToProps = (state) => ({
    isLoaded: isLoaded(state)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopicWiseQuestions));