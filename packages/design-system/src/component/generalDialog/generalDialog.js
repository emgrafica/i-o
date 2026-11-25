import React from 'react';
import PropTypes from "prop-types";
import { Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress } from '@material-ui/core';
import { CheckCircle, Close, Cancel } from '@material-ui/icons';
import './generalDialog.scss';
import { makeStyles } from "@material-ui/core";
import {
	StylesProvider,
	createGenerateClassName,
} from "@material-ui/core/styles";
import HlxButton from "../input/button/button";

const generateClassName = createGenerateClassName({
	productionPrefix: "io-generaldialog"
});

const useStyles = makeStyles(
	{
		colorStyle: {
			color: props => props.color + "!important",
		},
		backgroundStyle: {
			background: props => props.backgroundColor + "!important",
			"&:hover": {
				background: props => props.backgroundColor + "!important",
			}
		}
	}
);

export function ButtonComponentDialog(props) {
	const { onClick, text, startIcon, endIcon, classname, loading, disabled, variant } = props;
	const { colorStyle, backgroundStyle } = useStyles(props);
	return (
		<Button
			variant={variant}
			className={`${colorStyle} ${backgroundStyle} ${classname} dialog-button-component`}
			startIcon={loading && !!startIcon ? <CircularProgress size={16} /> : startIcon}
			endIcon={loading && !!endIcon ? <CircularProgress size={16} /> : endIcon}
			onClick={onClick}
			disabled={loading || disabled}
		>
			{text}
		</Button>
	);
};

const buttonDialog = (
	<HlxButton label="OK"></HlxButton>
);

function generalDialog(props) {
	const { title, content, headerDefault, buttonSubmit, hideButtonCancel, deviders, classname, fullWidth, maxWidth, handleClose, isOpen, disableBackdropClick } = props;
	return (
		<StylesProvider generateClassName={generateClassName}>
			<Dialog
				id="customized-dialog"
				className={`general-dialog ${classname}`}
				open={isOpen}
				onClose={handleClose}
				aria-labelledby="general-dialog-title"
				fullWidth={fullWidth}
				maxWidth={maxWidth}
				hideBackdrop={false}
				disableBackdropClick={disableBackdropClick}
			>
				{title ? (
					<DialogTitle id="general-dialog-title" onClose={handleClose}>
						<div className="general-dialog-title">
							{headerDefault ? (
								<div className="title-default">
									{title}
								</div>
							) : (
								<div className="title-header">
									{title}
								</div>
							)}
							{isOpen ? (
								<IconButton aria-label="close" className="general-dialog-button-close" onClick={handleClose}>
									<Close />
								</IconButton>
							) : null}
						</div>
					</DialogTitle>) : (null)}
				<DialogContent dividers={deviders}>
					<div className="general-dialog-content">
						{content}
					</div>
				</DialogContent>
				<DialogActions className="general-dialog-actions">
					{hideButtonCancel ? null : (
						<HlxButton
							label="CANCEL"
							onClick={handleClose}
						></HlxButton>
					)}
					{buttonSubmit}
				</DialogActions>
			</Dialog>
		</StylesProvider>
	);
};

generalDialog.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	headerDefault: PropTypes.bool,
	deviders: PropTypes.bool,
	hideButtonCancel: PropTypes.bool,
	fullWidth: PropTypes.bool,
	maxWidth: PropTypes.string,
	disableBackdropClick: PropTypes.bool,
	title: PropTypes.string,
	content: PropTypes.object,
	buttonSubmit: PropTypes.object,
	handleClose: PropTypes.func,
};

generalDialog.defaultProps = {
	isOpen: true,
	headerDefault: true,
	deviders: true,
	hideButtonCancel: false,
	disableBackdropClick: false,
	fullWidth: true,
	maxWidth: 'xs',
	title: 'General Dialog',
	content: 'Content Dialog',
	buttonSubmit: buttonDialog
};

export default generalDialog;