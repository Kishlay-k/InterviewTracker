import React, { useState, useEffect } from 'react';
import { getQuestions } from '../../api/index';
import { connect } from 'react-redux';
import { fetchQuestions } from '../../redux/problemset/problemSetActions';
import { problemset } from '../../redux/problemset/problemSetSelector';
import Question from '../../components/question/question';

function ProblemSet({ fetchQuestions, problemset }) {
    useEffect(() => {
        fetchQuestions();
    }, []);
    console.log(problemset);
    return (
        <div>
            { problemset?.map(e => 
                <Question key={ e.id } question={ e }/>
                ) }
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    fetchQuestions: () => dispatch(fetchQuestions())   
});

const mapStateToProps = (state) => ({
    problemset: problemset(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProblemSet);