import { connect } from "react-redux";
import TodoApp from "../components/TodoApp";
import { addTodo } from "../redux/todo";
const mapStateToProps = (state) => {
    return {
        todo: state.todo.items,
    }
};

const mapActionToProps = {
    addTodo: addTodo,
};

export default connect(mapStateToProps, mapActionToProps)(TodoApp)