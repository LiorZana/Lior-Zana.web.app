import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => {
    return {
        root: {
            pointerEvents:'auto',
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3,
            [theme.breakpoints.down('1400')]: {
                alignItems: 'initial',
            }
        },
    }
}

class PopupWrapper extends Component {


    render() {
        const { classes, handleWrapperClick, style = {} } = this.props;
        return (
            <div onClick={handleWrapperClick} style={style} className={classes.root}>
                {this.props.children}
            </div>
        )
    }

}

export default withStyles(styles, { withTheme: true })(PopupWrapper);