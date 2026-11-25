import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from "prop-types";
import "./deleteAttachmentModal.scss";
import { CheckCircle } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import GeneralDialog from "../../generalDialog/generalDialog";
import {
	StylesProvider,
	createGenerateClassName,
} from "@material-ui/core/styles";
import HlxButton from '../../input/button/button';

const generateClassName = createGenerateClassName({
	productionPrefix: "io-reopen-dialog"
});

const DeleteAttachment = (props) => {

	const { fileName, incidentNumber, isOpen, handleDelete, handleClose } = props;
	const { t } = useTranslation('requests');
	const content = (
		<>
			<Typography gutterBottom>
				Are you sure you want to remove <b>{fileName}</b> from <b>{incidentNumber}</b>
			</Typography>
		</>
	);
	const button = (
		<HlxButton
			label="OK"
			onClick={handleDelete}
		></HlxButton>

	);

	return (
		<StylesProvider generateClassName={generateClassName}>
			<GeneralDialog
				classname="delete-dialog"
				deviders={true}
				headerDefault={false}
				isOpen={isOpen}
				handleClose={handleClose}
				title={'Remove Attachment'}
				content={content}
				buttonSubmit={button}
			/>
		</StylesProvider>
	);

}
DeleteAttachment.propTypes = {
	fileName: PropTypes.string,
	isOpen: PropTypes.bool,
	handleDelete: PropTypes.func,
	handleClose: PropTypes.func,
}
DeleteAttachment.defaultProps = {
	fileName: '',
	isOpen: false,
	handleDelete: () => { },
	handleClose: () => { }
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




export default DeleteAttachment;
