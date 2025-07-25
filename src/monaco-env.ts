declare global {
  interface Window {
    MonacoEnvironment: any;
  }
}

window.MonacoEnvironment = {
  getWorkerUrl: function (moduleId: string, label: string) {
    // Map language labels to worker script paths
    const workerMap: Record<string, string> = {
      'json': 'assets/monaco-editor/min/vs/language/json/jsonWorker.js',
      'css': 'assets/monaco-editor/min/vs/language/css/cssWorker.js',
      'html': 'assets/monaco-editor/min/vs/language/html/htmlWorker.js',
      'typescript': 'assets/monaco-editor/min/vs/language/typescript/tsWorker.js',
      'javascript': 'assets/monaco-editor/min/vs/language/javascript/tsWorker.js',
      'editorWorkerService': 'assets/monaco-editor/min/vs/editor/editor.worker.js',
    };

    // Default fallback worker
    return workerMap[label] || workerMap['editorWorkerService'];
  }
};
