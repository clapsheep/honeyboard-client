declare module '@toast-ui/editor/dist/toastui-editor-viewer' {
    export default class Viewer {
        constructor(options: { el: HTMLElement; initialValue?: string });
        destroy(): void;
    }
}
