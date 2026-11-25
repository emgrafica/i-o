import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import "./reopenComponent.scss";
import PropTypes from "prop-types";
import GeneralDialog from "../generalDialog/generalDialog";
import {
	StylesProvider,
	createGenerateClassName,
} from "@material-ui/core/styles";
import HlxButton from "../input/button/button";

const generateClassName = createGenerateClassName({
	productionPrefix: "io-reopen-dialog"
});

const ReOpen = (props) => {

	const { incidentId, isOpen, handleReopen, handleClose, requiredReopenComment } = props;
	const [enableComment, setEnableComment] = useState(false);
	const { t } = useTranslation('requests');
	const [reopenReason, setReopenReason] = useState('');

	const content = (
		<>
			<Typography gutterBottom>
				You need to provide a comment before reopening <b>{incidentId}</b>.
			</Typography>
			<Input
				className="input-dialog"
				multiline={true}
				disableUnderline={true}
				placeholder="add comment here..."
				type="text"
				disabled={!enableComment}
				onChange={event => setReopenReason(event.target.value)}
			/>
		</>
	);

	const generateBtn = () => {
		return (
			<HlxButton label="REOPEN"
				onClick={() => handleReopen(reopenReason)}
				disabled={!reopenReason}>
			</HlxButton>
		)
	}

	useEffect(() => {
		setEnableComment(requiredReopenComment);
	}, [requiredReopenComment]);

	return (
		<StylesProvider generateClassName={generateClassName}>
			<GeneralDialog
				classname="reopen-dialog"
				deviders={true}
				headerDefault={false}
				isOpen={isOpen}
				handleClose={() => {
					setReopenReason('');
					handleClose();
				}}
				title={'Reopen Incident'}
				content={content}
				buttonSubmit={generateBtn()}
				requiredReopenComment={requiredReopenComment}
			/>
		</StylesProvider>
	);

}
ReOpen.propTypes = {
	isOpen: PropTypes.bool,
	incidentId: PropTypes.string,
	handleReopen: PropTypes.func,
	requiredReopenComment: PropTypes.bool

}
ReOpen.defaultProps = {
	isOpen: false,
	incidentId: '',
	requiredReopenComment: true,
	handleReopen: () => { }
};
const charLimit = 500;
/**
 * Leave Modal for that comes with navigation prompt.
 * @remarks Use this component when there is navigation prompt
 * needs to happen when the route changes. For any routes that
 * are governed by react-router, a Lumos themed modal will be
 * used. For any routes that is outside of react-router, such
 * as closing the tab, or an external page, the browser native
 * navigation strategies will be applied and when this happens,
 * it will ignore the title and content props supplied.
 * @remarks When need to prevent the LeaveModal from prompting,
 * add a state in the location with `force: true`:
 * e.g.,
 * history.push({
 *   pathname: '/next/path',
 *   state: {
 *     force: true,
 *   },
 * });
 */




export default ReOpen;
