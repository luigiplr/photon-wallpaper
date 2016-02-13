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
	'syncing',


	/* Reddit Actions */

	'fromChange',
	'sortChange',
	'scoreChange',
	'subredditChange',


	/* Bing Actions */

	'regionChange'
);