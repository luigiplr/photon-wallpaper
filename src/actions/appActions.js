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
	'subredditChange',


	/* Bing Actions */

	'regionChange'
);