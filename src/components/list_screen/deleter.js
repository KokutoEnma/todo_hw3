import React, { Component } from 'react'
import { getFirestore } from 'redux-firestore';

export class Deleter extends Component {
    hideDialog() {
        let dialog = document.getElementById("deleter_yes_no_dialog");
        dialog.classList.remove("is_visible");
    }
    deleteList= () => {
        const firestore = getFirestore();

        firestore.collection("todoLists").doc(this.props.todoListId).delete().then(()=>{
            window.location.href="http://localhost:3000/"
        })
    }
    render() {
        return (
            <div className="deleter" id="deleter_yes_no_dialog" data-animation="slideInOutLeft">
                <div className="deleter_dialog">
                    <header className="dialog_header">
                        Delete list?
                    </header>
                    <section className="dialog_content">
                        <p><strong>Are you sure you want to delete this list?</strong></p>
                    </section>
                        <button id="dialog_yes_button" onClick={this.deleteList.bind(this)}>Yes</button>
                        <button id="dialog_no_button" onClick={this.hideDialog.bind(this)}>No</button>
                    <footer className="dialog_footer">
                        The list will not be retreivable.
                    </footer>
                </div>
            </div>
        )
    }
}

export default Deleter