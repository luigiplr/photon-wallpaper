import alt from '../alt';



export default alt.generateActions(
	/* Core actions */

	'providerChange',
	'autoSyncChange',
	'syncTimeoutChange',
	'resolutionChange',
	'backupSet',


	/* Reddit Actions */

	'fromChange',
	'sortChange',
	'scoreChange',
	'subredditChange',


	/* Bing Actions */

	'regionChange'
);