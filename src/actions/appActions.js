import alt from '../alt';



export default alt.generateActions(
	/* Core actions */

	'providerChange',
	'autoSyncChange',
	'syncTimeoutChange',
	'resolutionChange',
	'backupSet',
	'filterChange',
	'error',


	/* Reddit Actions */

	'fromChange',
	'sortChange',
	'scoreChange',
	'subredditChange',


	/* Bing Actions */

	'regionChange'
);