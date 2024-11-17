import React from 'react'

export default function Alert(props) {
    let capitalize = (word) => {
        if (word === "danger") {
            word = "error";
        }
        let newWord = word.toLowerCase();
        return newWord.charAt(0).toUpperCase() + newWord.slice(1);
    }

    return (
        <div>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <div style={{position:'absolute', top:'22%'}}><strong>{capitalize(props.alert.type)}: </strong>{props.alert.msg}</div>
            </div>}
        </div>
    )
}
