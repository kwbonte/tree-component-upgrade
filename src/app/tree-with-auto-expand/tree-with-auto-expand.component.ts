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
    this.infographicKey = 1123;
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

  init(_data?: any) {
    if (_data) {
      this.label = _data["Label"];
      this.code = _data["Code"];
      this.isSelected = _data["IsSelected"];
      this.showInfographics = _data["ShowInfographics"];
      this.infographicsKey = _data["InfographicsKey"];
      this.color = _data["Color"];
      if (Array.isArray(_data["Children"])) {
        this.children = [] as any;
        for (let item of _data["Children"])
          this.children!.push(ParameterChoiceNode.fromJS(item));
      }
    }
  }

  static fromJS(data: any): ParameterChoiceNode {
    data = typeof data === 'object' ? data : {};
    let result = new ParameterChoiceNode();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["Label"] = this.label;
    data["Code"] = this.code;
    data["IsSelected"] = this.isSelected;
    data["ShowInfographics"] = this.showInfographics;
    data["InfographicsKey"] = this.infographicsKey;
    data["Color"] = this.color;
    if (Array.isArray(this.children)) {
      data["Children"] = [];
      for (let item of this.children)
        data["Children"].push(item.toJSON());
    }
    return data;
  }

  clone(): ParameterChoiceNode {
    const json = this.toJSON();
    let result = new ParameterChoiceNode();
    result.init(json);
    return result;
  }
}
