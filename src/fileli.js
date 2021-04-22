import React from 'react';
import ReactDOM from 'react-dom';
import { List, Avatar } from 'antd';


class FileLi extends React.Component {
    constructor(props) {
        super(props)
        console.log("in FileLi constructor")
    }

    render() {
        console.log("this is:", this)
        return (
            <div id="hover-gal">
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.files}
                    renderItem={item => (
                        <List.Item style={{ paddingLeft: "20px" }}>
                            <List.Item.Meta title={
                                <a href={"/" + this.props.url + "/" + item.name}>{decodeURI(item.name)}</a>
                            } description={"size: " + item.size} />
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export { FileLi }