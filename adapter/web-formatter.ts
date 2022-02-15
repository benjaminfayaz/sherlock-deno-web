import { Formatter, FormatterOnFinishOptions } from 'sherlock/formatters/formatter.ts';
import Observe from 'https://deno.land/x/Observe@v1.2.1/Observe.ts';
import type { SiteResult } from 'sherlock/types.ts';

export type WebFormatterOptions = {
  showAll: boolean;
  exportFormat?: 'csv' | 'json';
};

export class WebFormatter extends Formatter {
  observe = new Observe<SiteResult | undefined>(undefined);

  constructor(private webFormatterOptions: WebFormatterOptions) {
    console.log("called with option", webFormatterOptions.showAll)
    super({
      showAll: webFormatterOptions.showAll,
    });
  }

  onInit(): void {
    // TODO maybe init observe here?
  }
  onStart(): void {}

  onResult(siteResult: SiteResult): void {
    this.observe.setValue(siteResult);
  }
  onFinish(options: FormatterOnFinishOptions): void {
    // TODO print total count
    // TODO export file/ modal
  }
}
