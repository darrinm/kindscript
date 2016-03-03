import * as React from "react";
import * as ReactDOM from "react-dom";
import * as simsvg from "./simsvg";
import * as sui from "../sui"

import rt = yelm.rt;
import U = yelm.U;

export class BoardView extends React.Component<simsvg.IBoardProps, {}> {
    view: simsvg.MicrobitBoardSvg;

    componentDidUpdate() {
        if (this.view && !$(this.view.element).parentsUntil("body").length) {
            $(this.refs["simsvg"]).empty().append(this.view.element)
        }
    }

    render() {
        let runtime = this.props.runtime

        if (!runtime) return null

        if (runtime.target.name != "microbit") return null;

        if (!this.view || this.view.board !== runtime.board) {
            let props = U.flatClone(this.props)
            if (!props.theme)
                props.theme = simsvg.randomTheme();
            this.view = new simsvg.MicrobitBoardSvg(props)
        }

        var events = ["shake", "logo up", "logo down", "screen up", "screendown"];
        var eid = events[0];
        /*
        <div>                
            <sui.Dropdown class='selection search' value={eid}>
                {events.map(h => <sui.Item key={h} value={h} text={h} />) }
            </sui.Dropdown>
            <sui.Button class="secondary" icon="lab" popup="Simulate event."/>
        </div>
        */

        return (
            <div>
                <div ref="simsvg"></div>
            </div>
        )
    }
}