import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import "./resolvedComponent.scss";
import PropTypes from "prop-types";
import GeneralDialog from "../generalDialog/generalDialog";
import {
	StylesProvider,
	createGenerateClassName,
} from "@material-ui/core/styles";
import HlxButton from "../input/button/button";

const generateClassName = createGenerateClassName({
	productionPrefix: "io-resolved-dialog"
});

const ReSolved = (props) => {

	const { incidentId, isOpen, handleResolved, handleClose, requiredResolveComment } = props;
	const [enableComment, setEnableComment] = useState(false);
	const { t } = useTranslation('requests');
	const [resolvedReason, setResolvedReason] = useState('');

	const content = (
		<>
			<Typography gutterBottom>
				You need to provide a comment before marking <b>{incidentId}</b> as 'resolved'.
			</Typography>
			<Input
				className="input-dialog"
				multiline={true}
				disableUnderline={true}
				placeholder="add comment here..."
				type="text"
				disabled={!enableComment}
				onChange={event => setResolvedReason(event.target.value)}
			/>
		</>
	);

	const generateBtn = () => {
		return (
			<HlxButton label="MARK RESOLVED"
			onClick={() => handleResolved(resolvedReason)}
				disabled={!resolvedReason}>
			</HlxButton>
		)
	}

	useEffect(() => {
		setEnableComment(requiredResolveComment);
	}, [requiredResolveComment]);

	return (
		<StylesProvider generateClassName={generateClassName}>
			<GeneralDialog
				classname="resolved-dialog"
				deviders={true}
				headerDefault={false}
				isOpen={isOpen}
				handleClose={()=>{
					setResolvedReason('');
					handleClose();
				}}
				title={'Mark as Resolved'}
				content={content}
				buttonSubmit={generateBtn()}
				requiredResolveComment={requiredResolveComment}
			/>
		</StylesProvider>
	);

}
ReSolved.propTypes = {
	isOpen: PropTypes.bool,
	incidentId: PropTypes.string,
	handleResolved: PropTypes.func,
	requiredResolveComment: PropTypes.bool,

}
ReSolved.defaultProps = {
	isOpen: false,
	incidentId: '',
	requiredResolveComment: true,
	handleResolved: () => { }
};

export default ReSolved;
