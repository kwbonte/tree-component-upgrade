import { Component, OnInit, ViewChild } from '@angular/core';
import { ITreeOptions, TreeComponent } from 'angular-tree-component';

@Component({
  selector: 'app-tree-with-auto-expand',
  templateUrl: './tree-with-auto-expand.component.html',
  styleUrls: ['./tree-with-auto-expand.component.scss']
})
export class TreeWithAutoExpandComponent implements OnInit {
  public infographicKey: number;
  public nodes: ParameterChoiceNode[] = null;
  // tslint:disable-next-line: variable-name
  private _treeComponent: TreeComponent;
  @ViewChild('treeComponent', { static: false })
  public get treeComponent(): TreeComponent {
    return this._treeComponent;
  }
  // Here is where auto expansion is happening
  public set treeComponent(v: TreeComponent) {
    if (this._treeComponent === v) {
      return;
    }
    this._treeComponent = v;
    const node = this._treeComponent.treeModel.getNodeById(this.infographicKey);
    if (node !== undefined) {
      node.setActiveAndVisible();
    }
  }

  public options: ITreeOptions = {
    idField: 'code',
    displayField: 'label',
  };

  constructor() { }

  ngOnInit() {
    // This is the key that we will be auto epanding to. On load one should see Cenozoic (level 0) -> Quaternary (level 1) -> Holocene & Pleistocene (on same level 2)
    this.infographicKey = 112;
    // This is a cut down object that represents a tree for selecting geologic epochs and is representative of many trees in our app
    this.nodes = [
      new ParameterChoiceNode({
        label: 'Cenozoic', code: 1, isSelected: true, showInfographics: true, infographicsKey: 1, color: null, children: [
          new ParameterChoiceNode({
            label: 'Quaternary', code: 11, isSelected: true, showInfographics: false, infographicsKey: 11, color: null, children: [
              new ParameterChoiceNode({ label: 'Holocene', code: 111, isSelected: false, showInfographics: false, infographicsKey: 111, color: null, children: [] }),
              new ParameterChoiceNode({
                label: 'Pleistocene', code: 112, isSelected: true, showInfographics: true, infographicsKey: 112, color: null, children: [
                  new ParameterChoiceNode({
                    label: 'Pleistocene Late', code: 1121, isSelected: false, showInfographics: false, infographicsKey: 1121,
                    color: null, children: []
                  }),
                  new ParameterChoiceNode({
                    label: 'Pleistocene Middle', code: 1122, isSelected: false, showInfographics: false, infographicsKey: 1122,
                    color: null, children: []
                  }),
                  new ParameterChoiceNode({
                    label: 'Pleistocene Early', code: 1123, isSelected: true, showInfographics: false, infographicsKey: 1123,
                    color: null, children: [
                      new ParameterChoiceNode({
                        label: 'Calabrian', code: 11231, isSelected: true, showInfographics: false, infographicsKey: 11231,
                        color: null, children: []
                      }),
                      new ParameterChoiceNode({
                        label: 'Gelasian', code: 11232, isSelected: false, showInfographics: false, infographicsKey: 11232,
                        color: null, children: []
                      }),
                    ]
                  }),
                ]
              }),
            ]
          }),
        ]
      }),
    ]
  }
}

// This interface and class are api objects sent from a dotnet world via nswag, the full object is used in the demo above specifically because we are expanding the tree on load based on the infographics key that is selected.
export interface IParameterChoiceNode {
  label?: string | undefined;
  code: number;
  isSelected?: boolean | undefined;
  showInfographics?: boolean | undefined;
  infographicsKey?: number | undefined;
  color?: string | undefined;
  children?: ParameterChoiceNode[] | undefined;
}

export class ParameterChoiceNode implements IParameterChoiceNode {
  label?: string | undefined;
  code!: number;
  isSelected?: boolean | undefined;
  showInfographics?: boolean | undefined;
  infographicsKey?: number | undefined;
  color?: string | undefined;
  children?: ParameterChoiceNode[] | undefined;

  constructor(data?: IParameterChoiceNode) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}
