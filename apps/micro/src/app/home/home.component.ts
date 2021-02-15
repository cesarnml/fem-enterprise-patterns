import { Component } from '@angular/core';
import { Mode, Widget } from '@fem/api-interfaces';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'fem-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  price: number;
  widgets: Widget[];

  reCalculateTotal(mode: Mode, widgets: Widget[], widget: Widget) {
    this.widgets = this.updateWidgets(mode, widgets, widget);
    this.price = this.getTotalPrice(widgets);
  }

  updateWidgets(mode: Mode, widgets: Widget[], widget: Widget) {
    switch (mode) {
      case Mode.Create:
        this.widgets = this.addWidget(widgets, widget);
        break;
      case Mode.Update:
        this.widgets = this.updateWidget(widgets, widget);
        break;
      case Mode.Delete:
        this.widgets = this.deleteWidget(widgets, widget);
        break;
      default:
        return widgets;
    }
  }

  addWidget(widgets: Widget[], widget: Widget) {
    const newWidget = { ...widget, id: uuidv4() };
    return [...widgets, newWidget];
  }

  updateWidget(widgets: Widget[], widget: Widget) {
    return widgets.map((_widget) =>
      _widget.id === widget.id ? widget : _widget
    );
  }

  deleteWidget(widgets: Widget[], widget: Widget) {
    return widgets.filter((_widget) => _widget.id !== widget.id);
  }

  getTotalPrice(widgets: Widget[]) {
    return widgets.reduce((acc, curr) => acc + curr.price, 0);
  }
}
